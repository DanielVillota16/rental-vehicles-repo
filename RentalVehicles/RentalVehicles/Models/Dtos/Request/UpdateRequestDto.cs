using RentalVehicles.Models.Base;

namespace RentalVehicles.Models.Dtos
{
    public class UpdateRequestDto : CreateRequestDto, IHasId
    {
        public int Id { get; set; }
    }
}
