describe('gulp-browserstack', function() {
    it('should establish a tunnel', function() {
        browser.get(browser.baseUrl);
        var input = element(by.css('input[name="q"]'));
        
        expect(input).not.toBe(undefined);
    });
});