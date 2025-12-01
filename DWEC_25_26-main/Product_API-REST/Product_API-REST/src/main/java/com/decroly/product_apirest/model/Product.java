package com.decroly.product_apirest.model;

public class Product
{
    private int id;
    private String name;
    private String description;
    private double price;
    private String category;
    private String image;
    private boolean active;

    public Product(int id, String name, String description, double price, String category, String image, boolean active)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
        this.active = active;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public double getPrice() {
        return price;
    }

    public String getCategory() {
        return category;
    }

    public String getImage() {
        return image;
    }

    public boolean isActive() {
        return active;
    }
}
