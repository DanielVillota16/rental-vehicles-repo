using RentalVehicles.Models.Base;
using System.ComponentModel.DataAnnotations;

namespace RentalVehicles.Models.Entities
{
    public enum RequestStatus : int
    {
        Accepted = 0,
        Rejected = 1,
        Pending = 2,
        Finished = 3
    }
    public class Request : IHasId
    {
        public int Id { get; set; }

        public RequestStatus Status { get; set; }

        [Required]
        public int HoursOfRent { get; set; }

        [Required]
        public int DaysOfRent { get; set; }

        public int VehicleId { get; set; }

        public Vehicle? Vehicle { get; set; }

        public int ClientId { get; set; }

        public Client? Client { get; set; }

    }
}
