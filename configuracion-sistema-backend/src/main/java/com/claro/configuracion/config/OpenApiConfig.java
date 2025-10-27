package com.claro.configuracion.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Configuración de OpenAPI/Swagger para documentación de la API
 */
@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI configuracionSistemaOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de Configuración del Sistema")
                        .description("Backend API REST para configuración del sistema - RF 1.17\n\n" +
                                   "Esta API proporciona endpoints para gestionar:\n" +
                                   "- Motivos del sistema (crear, consultar, actualizar)\n" +
                                   "- Parámetros de configuración (crear, consultar, actualizar)\n" +
                                   "- Almacenes registrados (consultar)\n" +
                                   "- Empresas de transporte (consultar)\n" +
                                   "- Transportistas (consultar)")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Equipo de Desarrollo Claro")
                                .email("dev@claro.com")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8080/api")
                                .description("Servidor de desarrollo local")
                ));
    }
}
