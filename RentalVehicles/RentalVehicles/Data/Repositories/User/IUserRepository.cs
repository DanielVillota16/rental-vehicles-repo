using RentalVehicles.Data.Base;
using RentalVehicles.Models.Entities;

namespace RentalVehicles.Data.Repositories
{
    public interface IUserRepository<TUser> : IRepository<TUser>
        where TUser : User
    {
    }
}
