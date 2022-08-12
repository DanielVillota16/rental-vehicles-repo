using RentalVehicles.Data.Repositories;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class RepositoriesServiceCollection
    {

        //todo: add repositories and irepositories
        public static IServiceCollection AddRepositories(this IServiceCollection services) =>
            services.AddScoped<IClientRepository, ClientRepository>()
            .AddScoped<IAdminRepository, AdminRepository>()
            .AddScoped<IVehicleRepository, VehicleRepository>()
            .AddScoped<IRequestRepository, RequestRepository>();
    }
}
