#pragma once
# include <stddef.h>

int get_next_line(const int fd, char **line);
char *strjoin(char const *s1, char const *s2);
char *substr(char const *s, unsigned int start, size_t len);
int is_digit(int c);
