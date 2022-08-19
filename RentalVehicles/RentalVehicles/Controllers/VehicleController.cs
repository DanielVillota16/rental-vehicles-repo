using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RentalVehicles.Controllers.Base;
using RentalVehicles.Data.Repositories;
using RentalVehicles.Models.Dtos;
using RentalVehicles.Models.Entities;

namespace RentalVehicles.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleController : CustomControllerBase<Vehicle>
    {
        private const string getVehicleRouteName = "getVehicle";

        public VehicleController(IVehicleRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<List<VehicleDto>>> Get()
        {
            return await Get<VehicleDto>();
        }

        [HttpGet("{id:int}", Name = getVehicleRouteName)]
        public async Task<ActionResult<VehicleDto>> Get(int id)
        {
            return await Get<VehicleDto>(id);
        }

        [HttpPost]
        public async Task<ActionResult<VehicleDto>> Post([FromBody] CreateVehicleDto createVehicleDto)
        {
            return await Post<CreateVehicleDto, VehicleDto>(createVehicleDto, getVehicleRouteName);
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] UpdateVehicleDto updateVehicleDto)
        {
            return await Put<UpdateVehicleDto>(updateVehicleDto);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            return await base.Delete(id);
        }

    }
}
