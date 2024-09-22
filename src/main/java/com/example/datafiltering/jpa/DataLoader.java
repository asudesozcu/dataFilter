package com.example.datafiltering.jpa;

import java.sql.Date;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.datafiltering.data.Data;

import jakarta.transaction.Transactional;

@Component
@Transactional
public class DataLoader implements CommandLineRunner {

    @Autowired
    private DataRepo repository;

    @Override
    public void run(String... args) throws Exception {

        Data data1 = new Data("F54", "GAYRIMENKUL YATIRIM FONU1", Date.valueOf(LocalDate.of(2023, 06, 01)),
                "2023 HAZIRAN", 7454709218L, 7781542579L);

        Data data2 = new Data("F54", "GAYRIMENKUL YATIRIM FONU2", Date.valueOf(LocalDate.of(2023, 07, 01)),
                "2024 TEMMUZ", 7728362589L, 7806990656L);

        Data data3 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2025, 8, 01)),
                "2025 AGUSTOS", 77283756489L, 36224234L);

        Data data4 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2024, 9, 01)), "2024 EYLUL",
                4L, 32224234L);

        Data data5 = new Data("F53", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2024, 9, 01)), "2024 EYLUL",
                4L, 32224234L);

        Data data6 = new Data("F52", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2024, 9, 01)), "2024 EYLUL",
                4L, 32224234L);

        Data data7 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2023, 01, 01)),
                "2023 OCAK", 7454709218L, 7781542579L);
        Data data8 = new Data("F51", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2023, 01, 01)),
                "2023 OCAK", 7454709218L, 7781542579L);

        Data data9 = new Data("F51", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2024, 03, 01)),
                "2024 MART", 55L, 7781542579L);
        repository.save(data9);
        repository.save(data7);
        repository.save(data8);
        repository.save(data1);

        repository.save(data2);
        repository.save(data3);
        repository.save(data4);
        repository.save(data5);
        repository.save(data6);

        Data data10 = new Data("F51", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2026, 06, 01)),
                "2026 HAZIRAN", 7454709218L, 7781542579L);

        Data data12 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2026, 7, 01)), "2026 TEMMUZ", 7728362589L, 7806990656L);
        Data data13 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2026, 8, 01)), "2026 AĞUSTOS", 7753810666L, 8080472474L);
        Data data14 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2026, 9, 01)), "2026 EYLÜL", 8027292484L, 8620467359L);
        Data data15 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2026, 10, 01)), "2026 EKIM", 8567287369L, 9309530068L);
        Data data16 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2026, 11, 01)), "2026 KASIM", 9256350078L, 9509005209L);
        Data data17 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2026, 12, 01)), "2026 ARALIK", 9455825219L, 14576328394L);
        Data data18 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2027, 1, 01)), "2027 OCAK", 14523148404L, 14608090611L);
        Data data19 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2027, 2, 01)), "2027 ŞUBAT", 14554910621L, 14687563574L);
        Data data20 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2027, 3, 01)), "2027 MART", 14634383584L, 14832690789L);
        Data data21 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2027, 4, 01)), "2027 NİSAN", 14779510799L, 15353296822L);
        Data data22 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2027, 5, 01)), "2027 MAYIS", 15300116832L, 15476712889L);
        Data data23 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2027, 6, 01)), "2027 HAZİRAN", 15423532899L, 15590959752L);
        Data data24 = new Data("F54", "GAYRIMENKUL YATIRIM FONU", Date.valueOf(LocalDate.of(2027, 6, 01)), "2027 HAZİRAN", 15423532899L, 15590959L);


        repository.save(data24);
        repository.save(data10);
        repository.save(data17);
        repository.save(data12);
        repository.save(data13);
        repository.save(data14);
        repository.save(data15);
        repository.save(data16);
        repository.save(data18);
        repository.save(data19);
        repository.save(data20);
        repository.save(data21);
        repository.save(data22);
        repository.save(data23);
    }
}
