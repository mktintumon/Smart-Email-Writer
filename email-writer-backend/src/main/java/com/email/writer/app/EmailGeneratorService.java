package com.email.writer.app;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailGeneratorService {

    @Value("${gemini.api.URL}")
    private String geminiApiUrl;
    @Value("${gemini.api.API_KEY}")
    private String geminiApiKey;
    private final WebClient webClient;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailRequest emailRequest){
        // building the prompt
        String prompt = buildPrompt(emailRequest);

        // crafting the request
        Map<String,Object> requestBody = Map.of(
                "contents",new Object[]{
                        Map.of("parts",new Object[]{
                            Map.of("text",prompt)
                        })
        });

        // do request and get response
        String response = webClient.post()
                .uri(geminiApiUrl)
                .headers(headers -> {
                    headers.set("Content-Type","application/json");
                    headers.set("X-goog-api-key", geminiApiKey);
                })
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();


        // extract response and return
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response);
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        }catch (Exception e){
            return "Error processing request : " + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate the professional email reply, don't generate subjects ");

        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()){
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.");
        }

        prompt.append("\nOriginal Email :\n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }

}


    /* REQUEST FORMAT
    {
        "contents": [{
            "parts": [{
                "text": "About Indian university"
            }]
        }]
    }
    */

    /* RESPONSE FORMAT
    {
        "candidates": [
        {
            "content": {
            "parts": [
            {
                "text": "University holds a very special place in history and is....
    */
