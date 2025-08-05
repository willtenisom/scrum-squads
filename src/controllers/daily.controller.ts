import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { EmailService } from '../services/email.service';

@Controller('daily')
export class DailyController {
  constructor(private readonly emailService: EmailService) {}

  @Post('report')
  async sendReport(
    @Body() body: { pdfBase64: string; userEmail: string; squadName: string },
  ) {
    const { pdfBase64, userEmail, squadName } = body;

    if (!pdfBase64 || !userEmail || !squadName) {
      throw new HttpException(
        { error: 'Dados incompletos' },
        HttpStatus.BAD_REQUEST,
      );
    }

  try {
    await EmailService.sendDailyEmail(userEmail, pdfBase64);

    return { success: true, message: 'Relatório enviado!' };
    } catch (error) {
      console.error('Erro:', error);
      throw new HttpException(
        { error: 'Erro ao enviar relatório' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
