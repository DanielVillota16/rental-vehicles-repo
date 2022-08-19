using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentalVehicles.Controllers.Base;
using RentalVehicles.Data.Repositories;
using RentalVehicles.Models.Dtos;
using RentalVehicles.Models.Entities;
using RentalVehicles.Security;

namespace RentalVehicles.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : UserController<Admin>
    {
        private const string getAdminRouteName = "getAdmin";

        public AdminController(IAdminRepository repository, IMapper mapper, IConfiguration configuration) 
            : base(repository, mapper, getAdminRouteName, configuration) { }

        [HttpGet]
        public async Task<ActionResult<List<AdminDto>>> Get()
        {
            return await Get<AdminDto>();
        }

        [HttpGet("{id:int}", Name = getAdminRouteName)]
        public async Task<ActionResult<AdminDto>> Get(int id)
        {
            return await Get<AdminDto>(id);
        }

        [HttpPost]
        public async Task<ActionResult<AdminDto>> Post([FromBody] CreateAdminDto createAdminDto)
        {
            createAdminDto.PasswordHash = PasswordManager.Hash(createAdminDto.PasswordHash);
            return await Post<CreateAdminDto, AdminDto>(createAdminDto, getAdminRouteName);
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] UpdateAdminDto updateAdminDto)
        {
            return await Put<UpdateAdminDto>(updateAdminDto);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            return await base.Delete(id);
        }

        [HttpGet("requests/{username}"), Authorize]
        public ActionResult<List<RequestDto>> GetRequestsOfOwnedVehicles(string username)
        {
            var res = ((AdminRepository) repository).GetRequestsOfOwnedVehicles(username);
            return base.mapper.Map<List<RequestDto>>(res);
        }

        [HttpGet("vehicles/{username}"), Authorize]
        public ActionResult<List<VehicleDto>> GetOwnedVehicles(string username)
        {
            var res = ((AdminRepository) repository).GetOwnedVehicles(username);
            return base.mapper.Map<List<VehicleDto>>(res);
        }

        [HttpPut("request/{id:int}/{accept:bool}"), Authorize]
        public async Task<ActionResult<bool>> ModifyRequest(int id, bool accept)
        {
            var res = await ((AdminRepository)repository).AcceptRequest(id, accept);
            return Ok(res);
        }

        [HttpPut("request/{id:int}/finish"), Authorize]
        public async Task<ActionResult<RequestDto>> FinishRequest(int id)
        {
            var res = await ((AdminRepository)repository).FinishRequest(id);
            if (res == null) return BadRequest("Request not found");
            return Ok(res);
        }

    }
}
