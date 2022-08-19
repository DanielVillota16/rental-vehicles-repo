using RentalVehicles.Data.Base;
using RentalVehicles.Models.Entities;

namespace RentalVehicles.Data.Repositories
{
    public abstract class UserRepository<TUser> : RepositoryBase<TUser, ApplicationDbContext>, IUserRepository<TUser>
        where TUser : User
    {
        public UserRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public abstract User? GetUserByUsername(string username);
        //public abstract int? GetUserIdByUsername(string username);

    }
}
