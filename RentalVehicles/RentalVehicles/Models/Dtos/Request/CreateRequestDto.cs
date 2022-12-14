using RentalVehicles.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace RentalVehicles.Models.Dtos
{
    public class CreateRequestDto
    {
        public RequestStatus Status { get; set; }

        [Required]
        public int HoursOfRent { get; set; }

        [Required]
        public int DaysOfRent { get; set; }

        public int VehicleId { get; set; }
        
        public int ClientId { get; set; }
    }
}
