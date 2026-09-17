package com.practice.ecom.audit;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class TimingAspect {

    private static final Logger log = LoggerFactory.getLogger(TimingAspect.class);

    @Around("execution(* com.practice.ecom..service..*(..))")
    public Object time(ProceedingJoinPoint p) throws Throwable {
        long s = System.nanoTime();
        try {
            return p.proceed();
        } finally {
            log.info("operation={} elapsedMs={}", p.getSignature().getName(), (System.nanoTime() - s) / 1_000_000);
        }
    }
}
