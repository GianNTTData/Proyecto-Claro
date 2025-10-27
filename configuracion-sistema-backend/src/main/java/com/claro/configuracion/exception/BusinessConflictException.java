package com.claro.configuracion.exception;

/**
 * Excepción personalizada para conflictos de negocio (409)
 */
public class BusinessConflictException extends RuntimeException {
    
    public BusinessConflictException(String message) {
        super(message);
    }
}
