import { AdminAuthRequestDto } from "@dtos/AuthDto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AdminRepository } from "@repositories/AdminRepository";

export class AuthService {
  // Corrected hashedPassword method
  static hashedPassword(password: string) {
    const hash = bcrypt.hashSync(password, 10);
    console.log("Hashed password (to be saved):", hash);
    return hash;
  }

  static async Adminlogin(
    data: AdminAuthRequestDto
  ): Promise<{ token: string }> {
    // Find user by username
    const user = await AdminRepository.findOneBy({ username: data.username });

    if (!user) {
      throw new Error("Username not found");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (isMatch) {
      // JWT Expiry time parsing
      const expireMinutes = parseInt(
        process.env.JWT_EXPIRE_MINUTES || "600",
        10
      ); // Default to 60 minutes
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET || "defaultSecret",
        { expiresIn: expireMinutes + "m" }
      );
      return { token };
    } else {
      throw new Error("Incorrect password");
    }
  }

  static async createAdmin(
    data: AdminAuthRequestDto
  ): Promise<AdminAuthRequestDto> {
    // Hash the password
    const hashedPassword = this.hashedPassword(data.password);

    // Create a new admin entity
    const newAdmin = AdminRepository.create({
      username: data.username,
      password: hashedPassword,
    });

    // Save the new admin into the database
    return await AdminRepository.save(newAdmin);
  }
}
