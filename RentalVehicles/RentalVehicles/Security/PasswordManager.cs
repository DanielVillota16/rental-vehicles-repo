using System.Security.Cryptography;

namespace RentalVehicles.Security
{
    public class PasswordManager
    {
        private static readonly int ITERATIONS = 20000;

        /// <summary>
        /// Hashes and salts a given password.
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        public static string Hash(string password)
        {
            byte[] salt = new byte[16];
            RandomNumberGenerator rng = RandomNumberGenerator.Create();
            rng.GetBytes(salt);
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, ITERATIONS);
            byte[] hash = pbkdf2.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            string savedPasswordHash = Convert.ToBase64String(hashBytes);
            return savedPasswordHash;
        }

        /// <summary>
        /// Verifies a given plaintext password with a given database stored password.
        /// </summary>
        /// <param name="storedPasswordHash"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public static bool VerifyPasswords(string storedPasswordHash, string password)
        {
            /* Extract the bytes */
            byte[] hashBytes = Convert.FromBase64String(storedPasswordHash);
            /* Get the salt */
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);
            /* Compute the hash on the password the user entered */
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, ITERATIONS);
            byte[] hash = pbkdf2.GetBytes(20);
            /* Compare the results */
            for (int i = 0; i < 20; i++)
                if (hashBytes[i + 16] != hash[i]) 
                    return false;
            return true;
        }
    }
}
