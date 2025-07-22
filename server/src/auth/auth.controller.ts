import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from './guards/auth.guard'
import { Roles } from './decorators/roles.decorator'
import { Role } from './role.enum'
import { RolesGuard } from './guards/roles.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>, @Request() req) {
    console.log('signIn req: ', req.user);
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get('get-data')
  getData(@Request() req) {
    return req.user
  }
}