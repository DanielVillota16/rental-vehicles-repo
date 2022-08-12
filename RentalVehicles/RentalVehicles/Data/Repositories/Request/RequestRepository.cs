using RentalVehicles.Data.Base;
using RentalVehicles.Models.Entities;

namespace RentalVehicles.Data.Repositories
{
    public class RequestRepository : RepositoryBase<Request, ApplicationDbContext>, IRequestRepository
    {
        public RequestRepository(ApplicationDbContext dbContext) : base(dbContext) { }
    }
}
