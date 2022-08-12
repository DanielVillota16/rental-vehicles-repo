using RentalVehicles.Models.Base;

namespace RentalVehicles.Models.Dtos
{
    public class UpdateVehicleDto : CreateVehicleDto, IHasId
    {
        public int Id { get; set; }
    }
}
