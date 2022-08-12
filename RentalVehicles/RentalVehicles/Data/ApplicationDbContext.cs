using Microsoft.EntityFrameworkCore;
using RentalVehicles.Models.Entities;

namespace RentalVehicles.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Client> Clients { get; set; }

        public DbSet<Admin> Admins { get; set; }

        public DbSet<Vehicle> Vehicles { get; set; }

        public DbSet<Request> Requests { get; set; }

    }
}
