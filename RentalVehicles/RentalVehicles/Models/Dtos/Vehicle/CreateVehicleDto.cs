using RentalVehicles.Models.Entities;
using System.ComponentModel.DataAnnotations.Schema;

namespace RentalVehicles.Models.Dtos
{
    public class CreateVehicleDto
    {
        public string Plate { get; set; }

        public string Type { get; set; }

        public string Model { get; set; }

        public VehicleStatus Status { get; set; }

        [Column(TypeName = "money")]
        public decimal PricePerHour { get; set; }

        [Column(TypeName = "money")]
        public decimal PricePerDay { get; set; }

        public int OwnerId { get; set; }
    }
}
