using AutoMapper;
using RentalVehicles.Models.Dtos;
using RentalVehicles.Models.Entities;

namespace RentalVehicles.Models.AutoMapper
{
    public class RequestProfile : Profile
    {
        public RequestProfile()
        {
            CreateMap<CreateRequestDto, Request>();
            CreateMap<UpdateRequestDto, Request>();
            CreateMap<Request, RequestDto>();
        }
    }
}
