#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include "day01.h"

#define BUFF_SIZE 32

typedef struct s_file_list {
  int fd;
  char *save;
  struct s_file_list *next;
  struct s_file_list *prev;
} t_file_list;

static int get_index(const char *str, char c) {
  int i = 0;

	while (str && str[i] && str[i] != c) {
    i++;
  }

	return (i);
}

static int process_line(char **save, char **line, int length, int n) {
  char *tmp = *save;

  if ((tmp != NULL || n < 0) && (!(*line = substr(*save, 0, length)))) {
    return (-1);
  }

  if (tmp && tmp[length] == '\n') {
    length++;
  }

  if (tmp && tmp[length]) {
    *save = strdup(tmp + length);
  } else {
    *save = NULL;
  }

  n = (tmp != NULL || n > 0);
  free(tmp);

	return (n);
}

static int read_fd_line(const int fd, char **line, char **save)
{
  int n;
  int length;
  char *tmp;
  char str[BUFF_SIZE + 1];

  while ((length = get_index(*save, '\n')) == get_index(*save, '\0')) {
    if ((n = read(fd, str, BUFF_SIZE)) < 0) {
      return (-1);
    }

    if (n == 0) {
      break ;
    }

    str[n] = '\0';

    if (!(tmp = strjoin(*save ? *save : "", str))) {
      return (-1);
    }

    free(*save);
    *save = tmp;
	}

  return (process_line(save, line, length, n));
}

static void free_file_from_list(t_file_list **file_list) {
  t_file_list *tmp = *file_list;

  *file_list = tmp->next;

  if (*file_list == tmp) {
    *file_list = NULL;
  } else {
    tmp->prev->next = tmp->next;
    tmp->next->prev = tmp->prev;
  }

  free(tmp);
}

int get_next_line(const int fd, char **line) {
  int	n = 0;
  static t_file_list *file_list = NULL;
  t_file_list *current = file_list;

  while (file_list && (!n || current != file_list) && file_list->fd != fd && (n = 1)) {
    file_list = file_list->next;
  }

  if (!file_list || file_list->fd != fd) {
    if (!(current = (t_file_list*)malloc(sizeof(*current)))) {
      return (-1);
    }

		current->next = (file_list ? file_list->next : current);
		current->prev = (file_list ? file_list : current);
		current->next->prev = current;
		current->prev->next = current;
		current->save = NULL;
		file_list = current;
		file_list->fd = fd;
	}

  if ((n = read_fd_line(file_list->fd, line, &file_list->save)) == 0) {
    free_file_from_list(&file_list);
  }

	return (n);
}
