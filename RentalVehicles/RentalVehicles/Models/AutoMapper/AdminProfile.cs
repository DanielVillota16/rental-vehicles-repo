using AutoMapper;
using RentalVehicles.Models.Dtos;
using RentalVehicles.Models.Entities;

namespace RentalVehicles.Models.AutoMapper
{
    public class AdminProfile : Profile
    {
        public AdminProfile()
        {
            CreateMap<CreateAdminDto, Admin>();
            CreateMap<UpdateAdminDto, Admin>();
            CreateMap<Admin, AdminDto>();
            CreateMap<Admin, UserDto>();
            CreateMap<CreateUserDto, Admin>();
            CreateMap<UpdateUserDto, Admin>();
            CreateMap<User, AdminDto>();
        }
    }
}
