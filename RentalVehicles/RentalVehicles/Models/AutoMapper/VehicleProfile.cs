using AutoMapper;
using RentalVehicles.Models.Dtos;
using RentalVehicles.Models.Entities;

namespace RentalVehicles.Models.AutoMapper
{
    public class VehicleProfile : Profile
    {
        public VehicleProfile()
        {
            CreateMap<CreateVehicleDto, Vehicle>();
            CreateMap<UpdateVehicleDto, Vehicle>();
            CreateMap<Vehicle, VehicleDto>();
        }
    }
}
