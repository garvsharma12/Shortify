package com.url.shortify.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class UrlMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String originalUrl;
    private String shortUrl;
    private int clickCount = 0;
    private LocalDateTime createdDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "urlMapping")
    private List<ClickEvent> clickEvents = new ArrayList<>();
}
