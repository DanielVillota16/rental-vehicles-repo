using Microsoft.EntityFrameworkCore;
using RentalVehicles.Data.Base;
using RentalVehicles.Models.Dtos;
using RentalVehicles.Models.Entities;

namespace RentalVehicles.Data.Repositories
{
    public class AdminRepository : UserRepository<Admin>, IAdminRepository
    {
        public AdminRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        /// <summary>
        /// Gets the requests where the involved vehicle is owned by the admin with the given username.
        /// </summary>
        /// <param name="username">Username of the admin, owner of the involved vehicles.</param>
        /// <returns>List of requests.</returns>
        public List<Request> GetRequestsOfOwnedVehicles(string username)
        {
            var db = (ApplicationDbContext)base.dbContext;
            var query = from admin in db.Admins
                        join vehicle in db.Vehicles
                        on admin.Id equals vehicle.OwnerId
                        join request in db.Requests
                        on vehicle.Id equals request.VehicleId
                        where username == admin.Username
                        select request;
            return query.ToList();
        }

        public override Admin? GetUserByUsername(string username)
        {
            var db = (ApplicationDbContext)base.dbContext;
            var query = from admin in db.Admins
                        where username == admin.Username
                        select admin;
            if (query.Any()) return query.First();
            return null;
        }

        /*public override int? GetUserIdByUsername(string username)
        {
            var db = (ApplicationDbContext)base.dbContext;
            var query = from admin in db.Admins
                        where username == admin.Username
                        select admin.Id;
            if (query.Any()) return query.First();
            return null;
        }*/

        public List<Vehicle> GetOwnedVehicles(string username)
        {
            var db = (ApplicationDbContext)base.dbContext;
            var query = from admin in db.Admins
                        join vehicle in db.Vehicles
                        on admin.Id equals vehicle.OwnerId
                        where username == admin.Username
                        select vehicle;
            return query.ToList();
        }

        public async Task<bool> AcceptRequest(int id, bool accept)
        {
            var db = (ApplicationDbContext)base.dbContext;
            var query = from request in db.Requests
                        where request.Id == id
                        select request;
            if (query.Any()) {
                var req = query.First();
                req.Status = accept ? RequestStatus.Accepted : RequestStatus.Rejected;
                var query2 = from vehicle in db.Vehicles
                             where vehicle.Id == req.VehicleId
                             select vehicle;
                var veh = query2.First();
                db.Entry(veh).State = EntityState.Modified;
                db.Entry(req).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return true;
            }
            return false;
            
        }

        public async Task<Request?> FinishRequest(int id)
        {
            var db = (ApplicationDbContext)base.dbContext;
            var query = from request in db.Requests
                        where request.Id == id
                        select request;
            if(query.Any())
            {
                var req = query.First();
                req.Status = RequestStatus.Finished;
                db.Entry(req).State= EntityState.Modified;
                await db.SaveChangesAsync();
                return req;
            }
            return null;
        }
    }
}
