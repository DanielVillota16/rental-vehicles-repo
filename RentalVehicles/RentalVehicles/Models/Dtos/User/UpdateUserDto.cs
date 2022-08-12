using RentalVehicles.Models.Base;

namespace RentalVehicles.Models.Dtos
{
    public class UpdateUserDto : CreateUserDto, IHasId
    {
        public int Id { get; set; }
    }
}
