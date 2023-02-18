import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtDeveloperGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const token = req.headers.authorization;
            const user = this.jwtService.verify(token);
            const rol = user.role;
            if (!token || rol!="developer") {
                throw new UnauthorizedException({message: 'The user is not authorized or your role does not have access'})
            }         
            req.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: 'The user is not authorized or your role does not have access'})
        }
    }

}
