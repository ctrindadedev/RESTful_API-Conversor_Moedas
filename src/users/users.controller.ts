import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtService } from "@nestjs/jwt";
@Controller("auth")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}
  @Post("signup")
  async signup(@Body() body: { username: string; password: string }) {
    const user = await this.usersService.createUser(
      body.username,
      body.password
    );
    return { message: "User created successfully", userId: user.id };
  }
  @Post("login")
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.usersService.validateUser(
      body.username,
      body.password
    );
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
