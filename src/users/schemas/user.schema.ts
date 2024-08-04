import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { ACCOUNT_TYPE, ROLES } from 'src/constants/api.enums';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  username: string;

  @Prop()
  avatarUrl: string;

  @Prop({ enum: ACCOUNT_TYPE })
  @IsEnum(ACCOUNT_TYPE)
  type: string;

  @Prop({ enum: ROLES, default: 'user' })
  @IsEnum(ROLES)
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
