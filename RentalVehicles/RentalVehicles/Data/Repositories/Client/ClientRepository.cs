using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RentalVehicles.Data.Base;
using RentalVehicles.Models.Dtos;
using RentalVehicles.Models.Entities;

namespace RentalVehicles.Data.Repositories
{
    public class ClientRepository : UserRepository<Client>, IClientRepository
    {
        public ClientRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        /// <summary>
        /// Get the requests made by the client with the given username.
        /// </summary>
        /// <param name="username">Username of the client.</param>
        /// <returns>List of requests.</returns>
        public List<Request> GetRequestsMade(string username)
        {
            ApplicationDbContext db = (ApplicationDbContext)base.dbContext;
            var query = from client in db.Clients
                        join request in db.Requests
                        on client.Id equals request.ClientId
                        where username == client.Username
                        select request;
            return query.ToList();
        }

        public override Client? GetUserByUsername(string username)
        {
            var db = (ApplicationDbContext)base.dbContext;
            var query = from client in db.Clients
                        where username == client.Username
                        select client;
            if(query.Any()) return query.First();
            return null;
        }

        public List<Vehicle> GetAvailableVehicles(int id)
        {
            var db = (ApplicationDbContext)base.dbContext;
            var query1 = from vehicle in db.Vehicles
                         where vehicle.Status == VehicleStatus.Available
                         select vehicle;
            var query2 = from request in db.Requests
                         where request.ClientId == id && 
                         (request.Status == RequestStatus.Pending || request.Status == RequestStatus.Accepted)
                         select request;
            var query3 = from vehicle in query1
                         join request in query2
                         on vehicle.Id equals request.VehicleId
                         into grp
                         from request in grp.DefaultIfEmpty()
                         where request.Id == null
                         select vehicle;
            return query3.Distinct().ToList();
            /*return query3.GroupBy(vehicle => vehicle.Id)
                .Select(grp => grp.First())
                .ToList();*/
        }

        public async Task<Request?> CancelRequest(int id)
        {
            var db = (ApplicationDbContext)base.dbContext;
            var query = from request in db.Requests
                        where request.Id == id
                        select request;
            if (query.Any())
            {
                var req = query.First();
                if (req.Status == RequestStatus.Pending)
                {
                    req.Status = RequestStatus.Finished;
                    db.Entry(req).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                    return req;
                }
                return null;
            }
            return null;
        }

        /*public override int? GetUserIdByUsername(string username)
        {
            var db = (ApplicationDbContext)base.dbContext;
            var query = from client in db.Clients
                        where username == client.Username
                        select client.Id;
            if (query.Any()) return query.First();
            return null;
        }*/

    }
}
