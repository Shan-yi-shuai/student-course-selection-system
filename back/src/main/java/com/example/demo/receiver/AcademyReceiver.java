package com.example.demo.receiver;


import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class AcademyReceiver {
    private Map<String,String> idAndAcademyName;
    private List<Map<String,String>> idAndMajorNames;

    public void setIdAndAcademyName(Map<String, String> idAndAcademyName) {
        this.idAndAcademyName = idAndAcademyName;
    }

    public Map<String, String> getIdAndAcademyName() {
        return idAndAcademyName;
    }

    public void setIdAndMajorNames(List<Map<String, String>> idAndMajorNames) {
        this.idAndMajorNames = idAndMajorNames;
    }

    public List<Map<String, String>> getIdAndMajorNames() {
        return idAndMajorNames;
    }
}
