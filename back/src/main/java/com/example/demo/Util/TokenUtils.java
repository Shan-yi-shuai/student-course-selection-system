package com.example.demo.Util;

import com.auth0.jwt.JWT;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

public class TokenUtils {
    public static String getTokenRootId() {
        // 从 http 请求头中取出 token
        String token = Objects.requireNonNull(getRequest()).getHeader("token");
        return JWT.decode(token).getAudience().get(0);
    }

    /**
     * 获取request
     * @return
     */
    public static HttpServletRequest getRequest() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder
                .getRequestAttributes();
        return requestAttributes == null ? null : requestAttributes.getRequest();
    }
}
