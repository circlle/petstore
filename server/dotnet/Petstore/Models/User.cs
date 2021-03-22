using System;
using System.ComponentModel.DataAnnotations;

namespace Petstore.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int Status { get; set; }
        public string Avatar { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime CreateTime { get; set; }
    }
}