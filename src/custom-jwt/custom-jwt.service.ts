import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomJwtService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Generates both access and refresh tokens.
   */

  generateTokens(payload: any) {
    const pay = {
      id: payload.id,
      active: payload.is_active,
      admin: payload.is_active,
    };

    // Generate Access Token
    const accessToken = this.jwtService.sign(pay, {
      expiresIn: process.env.JWT_ACCESS_TIME,

      secret: process.env.JWT_ACCESS_KEY,
    });

    // Generate Refresh Token
    const refreshToken = this.jwtService.sign(pay, {
      secret: process.env.JWT_REFRESH_KEY,
      expiresIn: process.env.JWT_REFRESH_TIME,
    });

    return {
      id: payload.id,
      accessToken,
      refreshToken,
    };
  }

  /**
   * Generates an activation token.
   */
  generateActivationToken(payload: any) {
    return this.jwtService.sign(
      { id: payload.id },
      {
        secret: process.env.JWT_ACTIVATION_KEY,
        expiresIn: process.env.JWT_ACTIVATION_TIME || '3m',
      },
    );
  }

  /**
   * Verifies the validity of an access token.
   */
  verifyAccessToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_KEY,
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  /**
   * Verifies the validity of a refresh token.
   */
  verifyRefreshToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_KEY,
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Token is expired');
    }
  }

  /**
   * Verifies the validity of an activation token.
   */
  verifyActivationToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_ACTIVATION_KEY,
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Token is expired!');
    }
  }

  /**
   * Generates a password reset token.
   */
  generatePasswordResetToken(payload: any) {
    return this.jwtService.sign(
      { id: payload.id },
      {
        secret: process.env.JWT_PASSWORD_RESET_KEY,
        expiresIn: process.env.JWT_PASSWORD_RESET_TIME || '15m',
      },
    );
  }

  /**
   * Verifies the validity of a password reset token.
   */
  verifyPasswordResetToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_PASSWORD_RESET_KEY,
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Token is expired!');
    }
  }
}
