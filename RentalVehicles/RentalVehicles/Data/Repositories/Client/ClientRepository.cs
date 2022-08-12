using RentalVehicles.Data.Base;
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
