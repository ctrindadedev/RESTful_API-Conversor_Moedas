import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "your-secret-key",
      signOptions: { expiresIn: "60m" },
    }),
    UsersModule,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
