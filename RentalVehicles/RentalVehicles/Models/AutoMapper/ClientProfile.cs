using AutoMapper;
using RentalVehicles.Models.Dtos;
using RentalVehicles.Models.Entities;

namespace RentalVehicles.Models.AutoMapper
{
    public class ClientProfile : Profile
    {
        public ClientProfile()
        {
            CreateMap<CreateClientDto, Client>();
            CreateMap<UpdateClientDto, Client>();
            CreateMap<Client, ClientDto>();
            CreateMap<Client, UserDto>();
            CreateMap<CreateUserDto, Client>();
            CreateMap<UpdateUserDto, Client>();
            CreateMap<User, ClientDto>();
        }
    }
}
