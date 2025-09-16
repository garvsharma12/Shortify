package com.url.shortify;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@Disabled("Context smoke test disabled for unit test run; re-enable when integration DB is configured")
@SpringBootTest(properties = {
	// Avoid needing a real DB when simply loading context in this smoke test
	"spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration"
})
class ShortifyApplicationTests {

	@Test
	void contextLoads() {
		// Context should load without requiring a DataSource
	}
}
