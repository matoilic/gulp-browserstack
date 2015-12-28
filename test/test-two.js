describe('gulp-browserstack', function() {
    it('should work with multiple spec files', function() {
        browser.get(browser.baseUrl);
        var input = element(by.css('input[name="q"]'));

        expect(input.isPresent()).toBe(true);
    });
});
