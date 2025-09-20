import { Auth } from "@/domain/auth/Auth";
import { Claims } from "@/domain/auth/Claims";
import { Token } from "@/domain/auth/Token";
import { PasswordEncrypter } from "@/domain/user/ports/PasswordEncrypter";
import { TokenService } from "@/domain/user/ports/TokenService";
import { UserRepository } from "@/domain/user/ports/UserRepository";
import { UseCaseException } from "../exception/UseCaseException";

export class AuthUseCase {
  private userRepository: UserRepository;
  private static tokenService: TokenService;
  private encrypter: PasswordEncrypter;

  constructor(
    userRepository: UserRepository,
    tokenService: TokenService,
    encrypter: PasswordEncrypter
  ) {
    this.userRepository = userRepository;
    AuthUseCase.tokenService = tokenService;
    this.encrypter = encrypter;
  }

  public async login(credentials: Auth): Promise<Token> {
    const existingUser = await this.userRepository.findByEmail(
      credentials.email
    );

    if (!existingUser) throw new UseCaseException("User not found.");

    const passwordsMatch: boolean = await this.encrypter.validatePassword(
      credentials.password,
      existingUser.password
    );

    if (!passwordsMatch) throw new UseCaseException("Invalid credentials provided.");

    console.log(existingUser);
    
    return AuthUseCase.tokenService.generateToken({
        id: existingUser.id!.value!,
        personId: existingUser.person!.id.value,
        email: existingUser.email.value,
        role: existingUser.role.value
    });
  }

  static verifyToken(token: Token): Claims {
    return this.tokenService.verifyToken(token.value);
  }
}
