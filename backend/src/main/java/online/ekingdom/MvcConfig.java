package online.ekingdom;

import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.ModelAndView;

import java.util.Collections;

@Configuration
public class MvcConfig {

    @Bean
    public ErrorViewResolver customErrorViewResolver() {
        ModelAndView redirectToAngularApp = new ModelAndView("forward:/index.html", Collections.emptyMap());
        return ((request, status, model) -> status == HttpStatus.NOT_FOUND ? redirectToAngularApp : null);
    }
}
