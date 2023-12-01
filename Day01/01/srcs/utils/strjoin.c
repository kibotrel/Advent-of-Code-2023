
#include <stdlib.h>
#include <string.h>

char *strjoin(char const *s1, char const *s2) {
  size_t size = strlen(s1) + strlen(s2);
  char *join;

  if (!(join = (char *)malloc(sizeof(*join) * (size + 1)))) {
    return (0);
  }

  return (strcat(strcpy(join, s1), s2));
}
