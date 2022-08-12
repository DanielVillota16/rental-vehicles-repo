using Microsoft.EntityFrameworkCore;
using RentalVehicles.Data.Base;
using RentalVehicles.Models.Entities;

namespace RentalVehicles.Data.Repositories
{
    public class VehicleRepository : RepositoryBase<Vehicle, ApplicationDbContext>, IVehicleRepository
    {
        public VehicleRepository(ApplicationDbContext dbContext) : base(dbContext) { }

    }
}
