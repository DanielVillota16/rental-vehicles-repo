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
    public class RequestController : CustomControllerBase<Request>
    {
        private const string getRequestRouteName = "getRequest";

        public RequestController(IRequestRepository repository, IMapper mapper) : base(repository, mapper)
        {
        }

        [HttpGet]
        public async Task<ActionResult<List<RequestDto>>> Get()
        {
            return await Get<RequestDto>();
        }

        [HttpGet("{id:int}", Name = getRequestRouteName), Authorize]
        public async Task<ActionResult<RequestDto>> Get(int id)
        {
            return await Get<RequestDto>(id);
        }

        [HttpPost]
        public async Task<ActionResult<RequestDto>> Post([FromBody] CreateRequestDto createRequestDto)
        {
            return await Post<CreateRequestDto, RequestDto>(createRequestDto, getRequestRouteName);
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] UpdateRequestDto updateRequestDto)
        {
            return await Put<UpdateRequestDto>(updateRequestDto);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            return await base.Delete(id);
        }

    }
}
