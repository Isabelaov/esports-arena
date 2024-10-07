import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<string> {
    const { name, password, address, email, birthDate } = createPlayerDto;

    const existingPlayer: Player =
      (await this.playerRepository.findOneBy({ name })) ||
      (await this.playerRepository.findOneBy({ email }));

    if (existingPlayer)
      throw new BadRequestException('Player already exists (email or name)');

    const hashedPassword: string = await bcrypt.hash(password, 10);
    const newPlayer: Player = this.playerRepository.create({
      name,
      email,
      password: hashedPassword,
      address,
      birthDate,
    });

    await this.playerRepository.save(newPlayer);

    return 'Player created successfully';
  }

  async findAll(): Promise<Player[]> {
    const result: Player[] = await this.playerRepository.find();

    // TODO: implement filters (name, email)

    if (!result) throw new NotFoundException('Players not found');

    return result;
  }

  async findByIds(ids: string[]): Promise<Player[]> {
    const result = await this.playerRepository
      .createQueryBuilder('player')
      .where('player.id IN (:...ids)', { ids })
      .andWhere('player.isActive != FALSE')
      .getMany();

    if (!result) throw new NotFoundException('Players not found');

    return result;
  }

  async findOne(id: string): Promise<Player> {
    const result: Player = await this.playerRepository.findOneBy({ id });
    if (!result) throw new NotFoundException('Player not found');

    return result;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<string> {
    await this.findOne(id);
    const { ...data } = updatePlayerDto;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    await this.playerRepository.update(id, data);

    return 'Player updated successfully';
  }

  async remove(id: string): Promise<string> {
    await this.findOne(id);
    await this.playerRepository.update(id, { isActive: false });
    return `Player set as inactive`;
  }
}
