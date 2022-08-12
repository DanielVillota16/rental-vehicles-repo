using System.ComponentModel.DataAnnotations;

namespace RentalVehicles.Models.Dtos
{
    public class CreateUserDto
    {
        [Required]
        [MaxLength(80)]
        public string FullName { get; set; }

        [Required]
        [MaxLength(20)]
        public string LegalIdNumber { get; set; }

        [Required]
        [MaxLength(20)]
        public string Username { get; set; }

        [Required]
        [MaxLength(80)]
        public string PasswordHash { get; set; }

        [MaxLength(30)]
        public string? PhoneNumber { get; set; }

        [MaxLength(80)]
        public string? Email { get; set; }
    }
}
