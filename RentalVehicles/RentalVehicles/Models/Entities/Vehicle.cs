using RentalVehicles.Models.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace RentalVehicles.Models.Entities
{
    public enum VehicleStatus : int
    {
        Available = 0,
        Unavailable = 1
    }

    public class Vehicle : IHasId
    {
        public int Id { get; set; }
        
        public string Plate { get; set; }

        public string Type { get; set; }

        public string Model { get; set; }

        public VehicleStatus Status { get; set; }

        [Column(TypeName="money")]
        public decimal PricePerHour { get; set; }

        [Column(TypeName = "money")]
        public decimal PricePerDay { get; set; }

        public int OwnerId { get; set; }

        public Admin? Owner { get; set; }

    }
}
