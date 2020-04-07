/**
  ******************************************************************************
  * File Name          : main.c
  * Description        : Main program body
  ******************************************************************************
  ** This notice applies to any and all portions of this file
  * that are not between comment pairs USER CODE BEGIN and
  * USER CODE END. Other portions of this file, whether 
  * inserted by the user or by software development tools
  * are owned by their respective copyright owners.
  *
  * COPYRIGHT(c) 2018 STMicroelectronics
  *
  * Redistribution and use in source and binary forms, with or without modification,
  * are permitted provided that the following conditions are met:
  *   1. Redistributions of source code must retain the above copyright notice,
  *      this list of conditions and the following disclaimer.
  *   2. Redistributions in binary form must reproduce the above copyright notice,
  *      this list of conditions and the following disclaimer in the documentation
  *      and/or other materials provided with the distribution.
  *   3. Neither the name of STMicroelectronics nor the names of its contributors
  *      may be used to endorse or promote products derived from this software
  *      without specific prior written permission.
  *
  * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
  * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
  * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
  * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  *
  ******************************************************************************
  */
/* Includes ------------------------------------------------------------------*/
#include "main.h"
#include "stm32f4xx_hal.h"
#include "adc.h"
#include "can.h"
#include "gpio.h"

/* USER CODE BEGIN Includes */


/* USER CODE END Includes */

/* Private variables ---------------------------------------------------------*/

/* USER CODE BEGIN PV */
uint8_t can_message[8];
uint8_t can_rx_int = 0;
extern CAN_HandleTypeDef hcan1;
extern ADC_HandleTypeDef hadc1;
char *data;
volatile uint16_t buff=0;
int flag = 0;
/* Private variables ---------------------------------------------------------*/

/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);

/* USER CODE BEGIN PFP */
void HAL_ADC_ConvCpltCallback(ADC_HandleTypeDef *hadc)
{
	buff=HAL_ADC_GetValue(&hadc1);
	if(flag == 1)
	{
		can_tx(buff);
		flag =0;
	}
	HAL_ADC_Stop_IT(&hadc1);
	
}
/* Private function prototypes -----------------------------------------------*/

/* USER CODE END PFP */

/* USER CODE BEGIN 0 */
void RxIntEnable(CAN_HandleTypeDef *CanHandle) {
	if(CanHandle->State == HAL_CAN_STATE_BUSY_TX)
	  CanHandle->State = HAL_CAN_STATE_BUSY_TX_RX0;
	else {
	  CanHandle->State = HAL_CAN_STATE_BUSY_RX0;

		/* Set CAN error code to none */
		CanHandle->ErrorCode = HAL_CAN_ERROR_NONE;

		/* Enable Error warning Interrupt */
		__HAL_CAN_ENABLE_IT(CanHandle, CAN_IT_EWG);

		/* Enable Error passive Interrupt */
		__HAL_CAN_ENABLE_IT(CanHandle, CAN_IT_EPV);

		/* Enable Bus-off Interrupt */
		__HAL_CAN_ENABLE_IT(CanHandle, CAN_IT_BOF);

		/* Enable Last error code Interrupt */
		__HAL_CAN_ENABLE_IT(CanHandle, CAN_IT_LEC);

		/* Enable Error Interrupt */
		__HAL_CAN_ENABLE_IT(CanHandle, CAN_IT_ERR);
	  }

	  // Enable FIFO 0 message pending Interrupt
	  __HAL_CAN_ENABLE_IT(CanHandle, CAN_IT_FMP0);
}


void HAL_CAN_RxCpltCallback(CAN_HandleTypeDef *CanHandle) {
	if(CanHandle->pRxMsg->StdId == 0x321 && CanHandle->pRxMsg->IDE == CAN_ID_STD && CanHandle->pRxMsg->DLC <= 8) {
		can_message[0] = CanHandle->pRxMsg->Data[0];
		can_message[1] = CanHandle->pRxMsg->Data[1];
		can_message[2] = CanHandle->pRxMsg->Data[2];
		can_message[3] = CanHandle->pRxMsg->Data[3];
		can_message[4] = CanHandle->pRxMsg->Data[4];
		can_message[5] = CanHandle->pRxMsg->Data[5];
		can_message[6] = CanHandle->pRxMsg->Data[6];
		can_message[7] = CanHandle->pRxMsg->Data[7];
		sprintf(data,"ID==>%x\tDLC==>[%x]\tDATA==>%x %x %x %x %x %x %x %x\n",CanHandle->pRxMsg->StdId,CanHandle->pRxMsg->IDE,
																								can_message[0],
																								can_message[1],
																								can_message[2],
																								can_message[3],
																								can_message[4],
																								can_message[5],
																								can_message[6],
																								can_message[7]);
		can_rx_int = 1;
	}

	RxIntEnable(CanHandle);
}
/* USER CODE END 0 */

int main(void)
{

  /* USER CODE BEGIN 1 */
	//int i=0;
	char *tmp;
  /* USER CODE END 1 */

  /* MCU Configuration----------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */

  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_ADC1_Init();
	MX_CAN1_Init();
  /* USER CODE BEGIN 2 */
sprintf(tmp,"System Initialized!!!\n");
//while(HAL_GPIO_ReadPin(GPIOA,GPIO_PIN_0)==0)
//		HAL_GPIO_TogglePin(GPIOD,GPIO_PIN_14);
//	Blink_led(OFF);
//	while(1){
//		can_tx();
//		Blink_led(GREEN);
//		if(can_rx_int){
//			can_rx_int = 0;
//			i=0;
//			while(data[i]!=NULL)
//			//USART2_tx(data[i++]);
//			Blink_led(RED);
//		}
//	}
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
	RxIntEnable(&hcan1);
	while(HAL_GPIO_ReadPin(GPIOA,GPIO_PIN_0)==0)
		HAL_GPIO_WritePin(GPIOD,GPIO_PIN_12,GPIO_PIN_SET);
	HAL_GPIO_WritePin(GPIOD,GPIO_PIN_12,GPIO_PIN_RESET);
  while (1)
  {
  /* USER CODE END WHILE */

  /* USER CODE BEGIN 3 */
		
			HAL_GPIO_TogglePin(GPIOD,GPIO_PIN_12);	//PD12
			HAL_Delay(500);
			flag=1;
			HAL_ADC_Start_IT(&hadc1);
			
			/*CAN Transmit after Button Pressed Data, in ADC START*/
		
		/*if CAN data received*/
		if(can_rx_int){
			can_rx_int = 0;
			HAL_GPIO_TogglePin(GPIOD,GPIO_PIN_14);	//PD14
			HAL_Delay(500);
		}
  }
  /* USER CODE END 3 */

}

/** System Clock Configuration
*/
void SystemClock_Config(void)
{

  RCC_OscInitTypeDef RCC_OscInitStruct;
  RCC_ClkInitTypeDef RCC_ClkInitStruct;

    /**Configure the main internal regulator output voltage 
    */
  __HAL_RCC_PWR_CLK_ENABLE();

  __HAL_PWR_VOLTAGESCALING_CONFIG(PWR_REGULATOR_VOLTAGE_SCALE1);

    /**Initializes the CPU, AHB and APB busses clocks 
    */
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSE;
  RCC_OscInitStruct.HSEState = RCC_HSE_ON;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
  RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSE;
  RCC_OscInitStruct.PLL.PLLM = 4;
  RCC_OscInitStruct.PLL.PLLN = 168;
  RCC_OscInitStruct.PLL.PLLP = RCC_PLLP_DIV2;
  RCC_OscInitStruct.PLL.PLLQ = 7;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    _Error_Handler(__FILE__, __LINE__);
  }

    /**Initializes the CPU, AHB and APB busses clocks 
    */
  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV4;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV2;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_5) != HAL_OK)
  {
    _Error_Handler(__FILE__, __LINE__);
  }

    /**Configure the Systick interrupt time 
    */
  HAL_SYSTICK_Config(HAL_RCC_GetHCLKFreq()/1000);

    /**Configure the Systick 
    */
  HAL_SYSTICK_CLKSourceConfig(SYSTICK_CLKSOURCE_HCLK);

  /* SysTick_IRQn interrupt configuration */
  HAL_NVIC_SetPriority(SysTick_IRQn, 0, 0);
}

/* USER CODE BEGIN 4 */

/* USER CODE END 4 */

/**
  * @brief  This function is executed in case of error occurrence.
  * @param  None
  * @retval None
  */
void _Error_Handler(char * file, int line)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* User can add his own implementation to report the HAL error return state */
  while(1) 
  {
  }
  /* USER CODE END Error_Handler_Debug */ 
}

#ifdef USE_FULL_ASSERT

/**
   * @brief Reports the name of the source file and the source line number
   * where the assert_param error has occurred.
   * @param file: pointer to the source file name
   * @param line: assert_param error line source number
   * @retval None
   */
void assert_failed(uint8_t* file, uint32_t line)
{
  /* USER CODE BEGIN 6 */
  /* User can add his own implementation to report the file name and line number,
    ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */
  /* USER CODE END 6 */

}

#endif

/**
  * @}
  */ 

/**
  * @}
*/ 

/************************ (C) COPYRIGHT STMicroelectronics *****END OF FILE****/
