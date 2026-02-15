import { Controller, Get, Post, Body, Logger } from '@nestjs/common';

// Data Transfer Object (DTO) for strict typing
class AssetDto {
  id: string;
  value: number;
  owner: string;
}

@Controller('nexus')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  private readonly riskThreshold = 5000; // nexus protocol limit

  @Post('assess-risk')
  assessRisk(@Body() asset: AssetDto) {
    this.logger.log(`Processing Risk Assessment for Asset: ${asset.id}`);

    // Risk Engine Logic:
    // 1. High Value Check
    const isHighValue = asset.value > this.riskThreshold;
    
    // 2. Protocol Decision
    const riskScore = isHighValue ? 85 : 10;
    const status = riskScore > 50 ? 'MANUAL_REVIEW' : 'APPROVED';

    return {
      assetId: asset.id,
      riskScore,
      status,
      timestamp: new Date().toISOString(),
      handler: 'Nexus-Core-v1'
    };
  }

  @Get('status')
  getSystemStatus() {
    return { 
      system: 'Nexus Risk Engine', 
      status: 'OPERATIONAL', 
      uptime: process.uptime() 
    };
  }
}