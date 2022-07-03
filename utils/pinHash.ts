import bcrypt from 'bcrypt'

export class Password {
    static Hash = async (pin: any) => {
        const saltRounds = 10;
        pin = await bcrypt.hash(pin, saltRounds)
        return pin;
    };
    static Compare = async (pin: any, hashedPin: any) => {
        return await bcrypt.compare(pin, hashedPin)
    };
  }